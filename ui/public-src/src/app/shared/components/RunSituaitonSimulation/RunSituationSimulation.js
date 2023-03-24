import React, { useEffect, useState } from 'react';
import ReactFlow, { snapGrid } from 'react-flow-renderer';
import _ from 'lodash';
import ConfigureSituationFlow from '../ConfigureSituationFlow/ConfigureSituationFlow';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';

export default function RunSituationSimulation(props) {
  const [elements, setElements] = useState(false);
  const [openConfigurationPanel, setOpenConfigurationPanel] = useState(false);
  const [selectedNode, setSelectedNode] = useState();
  const [situationList, setSituationList] = useState([]);
  const [connectors, setConnectors] = useState([]);
  const [running, setRunning] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [step, setStep] = useState(0);
  const [sense, setSense] = useState(1);
  const [records, setRecords] = useState(5);
  const [generatedData, setGeneratedData] = useState([]);

  const closeConfigurationPanel = (saved) => {
    if (saved) {
      setRunning(false);
      setCompleted(false);
    }
    setOpenConfigurationPanel(false);
  };

  const handleNodeClick = (e, node) => {
    setSelectedNode(node);
    setOpenConfigurationPanel(true);
  };

  const getSituaitonName = (situaitonId) => {
    return situationList.find((s) => s._id === situaitonId).situation_name;
  };

  const getBorderStyle = (status) => {
    if (status == 'active') {
      return '3px solid #f3ca20';
    }
    if (status == 'completed') {
      return '3px solid #a8c66c';
    }
    if (status == 'failed') {
      return '3px solid #b20238';
    }
  };

  const modifyElement = (situationId, status) => {
    const newElementlist = _.cloneDeep(elements);
    // console.log(newElementlist, situationId, status);
    newElementlist.find((elem) => elem.situationId == situationId).style = {
      border: getBorderStyle(status),
      padding: 10,
    };

    setElements(newElementlist);
  };

  const writeIntoConsole = (message, id, name) => {
    props.store.sessionsStore.addLogs({
      message: message,
      situationId: id,
      situationName: name,
      timestamp: new Date(),
      type: 'session_payload',
    });
  };

  // added to get the situation details from the create and edit situation page
  const getSituationData = (situationId) => {
    API.get('/situation/get/' + situationId).then((res) => {
      const situationData = res.data;
      console.log('situationData', situationData);
    });
  };
  const runSimulation = () => {
    const context = props.transitions.map((item) => [item.from, item.intermediate, item.to]).flat(1)[step];
    const socket = new WebSocket('ws://localhost:8000/websocket');
    let k = 1;
    let intervalID;
    // Connection opened
    socket.addEventListener('open', function (event) {
      const lat_long = JSON.parse(localStorage.getItem('weatherData'));
      console.log(props.situationList)
      const situationData = [...props.situationList].map((data) => ({ ...data, weather: lat_long }));
      intervalID = setInterval(() => {
        socket.send(JSON.stringify(situationData) /*.filter((item) => item._id === context))*/);
      }, Number(sense) * 1000);
    });
    socket.onmessage = function (event) {
      const { data: consoleData } = event;

      writeIntoConsole(consoleData + step);
      const { data: parsedData } = JSON.parse(consoleData.replaceAll("'", '"'));
      setGeneratedData((data) => {
        let result;
        if (step === 0) {
          result = parsedData.filter((item) => item.TrafficScenarioApplication_Situations.situation_name === 'low_traffic');
        }
        if (step === 1) {
          result = parsedData.filter((item) => item.TrafficScenarioApplication_Situations.situation_name === 'moderate_traffic');
        }
        if (step === 2) {
          result = parsedData.filter((item) => item.TrafficScenarioApplication_Situations.situation_name === 'high_traffic');
        }

        return [...data, result];
      });

      if (k === Number(records)) {
        clearInterval(intervalID);

        socket.close();
        setStep((step) => ++step);
        return;
      }
      k++;
    };
    // return socket;
  };

  useEffect(() => {
    if (props.transitions && step !== 0 && step <= 2) {
      runSimulation();
    }
    if (step === 3) {
      setRunning(false);
      // setStep(0);
    }
  }, [step, props.transitions]);

  useEffect(() => {
    if (step === 3) {
      const csvString = [
        ['Speed', 'Density', 'TripTime', 'Certainity', 'TimeStamp', 'Situation'],
        ...generatedData.flat(1).map((item) => {
          return [
            item.situation_inference.attribute_vales.Speed,
            item.situation_inference.attribute_vales.density,
            item.situation_inference.attribute_vales.time,
            item.situation_inference.certainity,
            `${new Date(item.timestamp * 1000).getFullYear()}-${new Date(item.timestamp * 1000).getMonth() + 1}-${new Date(
              item.timestamp * 1000
            ).getDate()} ${new Date(item.timestamp * 1000).toLocaleTimeString('default')}`,
            item.TrafficScenarioApplication_Situations.situation_name,
          ];
        }),
      ]
        .map((e) => e.join(','))
        .join('\n');

      // console.log(csvString);

      /**Creating automatic download after data generation is completed */
      let hiddenElement = document.createElement('a');
      hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvString);
      hiddenElement.target = '_blank';

      hiddenElement.download = 'ExportedData.csv';
      setTimeout(() => {
        hiddenElement.click();
      }, 1500);
    }
  }, [generatedData, step]);

  const generateElements = () => {
    const newSituaitonList = _.cloneDeep(props.situationList).map((situation, index) => {
      return {
        id: index + '',
        data: {
          label: situation.situation_name,
          situation: situation,
          color: '#1A192B',
        },
        position: { x: 300, y: (index + 1) * 100 },
        situationId: situation._id,
        style: { border: '2px solid #000', padding: 10 },
      };
    });
    console.log('new Situation list', newSituaitonList);
    console.log(props);
    if (props.transitions) {
      const transitionConnectors = props.transitions.map((transition, index) => {
        // return transition;
        const connector = {
          id: transition.from + '_' + transition.to,
          source: newSituaitonList.find((s) => s.situationId == transition.from).id || '',
          target: newSituaitonList.find((s) => s.situationId == transition.to).id || '',
          arrowHeadType: 'arrowclosed',
        };
        newSituaitonList.push(connector);
      });
      console.log('transitionConnectors', transitionConnectors);
      setConnectors(transitionConnectors);
    }
    setElements(newSituaitonList);
  };

  useEffect(() => {
    if (props.situationList && props.situationList.length) {
      generateElements();
      setSituationList(props.situationList);
    }
  }, [props]);

  return (
    <React.Fragment>
      <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'baseline' }}>
        <TextField
          label="Sense Frequency"
          type="number"
          // className={props.classes.textField + ' ' + props.classes.noMarginTop}
          value={sense}
          onChange={(e) => setSense(e.target.value)}
          margin="normal"
        />
        <TextField
          label="No. of records"
          type="number"
          // className={props.classes.textField + ' ' + props.classes.noMarginTop}
          value={records}
          onChange={(e) => setRecords(e.target.value)}
          margin="normal"
        />
        {props.transitions && props.transitions.length > 0 && !running && !completed ? (
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setRunning(true);
              runSimulation();
            }}
            style={{ height: 'fit-content' }}
          >
            Generate Data
          </Button>
        ) : running ? (
          'Simulation running ...'
        ) : completed ? (
          'Simulaiton completed.'
        ) : (
          ''
        )}
      </div>
      <div style={{ display: 'flex', marginTop: '20px' }}>
        <div style={{ display: 'flex', marginRight: '20px' }}>
          <div
            style={{
              height: '15px',
              width: '15px',
              backgroundColor: '#f3ca20',
              marginRight: '5px',
              borderRadius: '50%',
            }}
          ></div>
          <div>Active</div>
        </div>
        <div style={{ display: 'flex', marginRight: '20px' }}>
          <div
            style={{
              height: '15px',
              width: '15px',
              backgroundColor: '#a8c66c',
              marginRight: '5px',
              borderRadius: '50%',
            }}
          ></div>
          <div>Completed</div>
        </div>
        <div style={{ display: 'flex', marginRight: '20px' }}>
          <div
            style={{
              height: '15px',
              width: '15px',
              backgroundColor: '#b20238',
              marginRight: '5px',
              borderRadius: '50%',
            }}
          ></div>
          <div>Failed</div>
        </div>
      </div>
      <div style={{ height: '80vh' }}>
        {console.log(elements)}
        {elements && elements.length > 0 ? (
          <ReactFlow elements={elements} onNodeDoubleClick={(e, node) => handleNodeClick(e, node)} snapToGrid={true} snapGrid={snapGrid} />
        ) : (
          <div>No Situaitons</div>
        )}
        {openConfigurationPanel && (
          <ConfigureSituationFlow
            selectedNode={selectedNode}
            situationList={situationList}
            openConfigurationPanel={openConfigurationPanel}
            closeConfigurationPanel={closeConfigurationPanel}
            elementList={elements}
          ></ConfigureSituationFlow>
        )}
      </div>
    </React.Fragment>
  );
}
