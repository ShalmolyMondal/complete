import React, { useEffect, useState } from 'react';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import './ConfigureSituationFlow.css';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ConfigureForm from './ConfigureForm';

export default function ConfigureSituationFlow(props) {
  const [inputNode, setInputNode] = useState(false);
  const [transitTo, setTransitTo] = useState();
  const handleSelectChange = (e) => {
    console.log(e);
  };

  useEffect(() => {
    if (props) {
      console.log(props.situationList);
      console.log();
      // props.situationList.find(s => s.id == Number(props.selectedSituationId))
    }
  }, [props]);
  return (
    <Drawer
      anchor="right"
      variant="temporary"
      open={props.openConfigurationPanel}
    >
      <div style={{ minWidth: '300px' }} className="p-20">
        <div className="mtb-20 drawer-title">
          <div>Situation configuration</div>
          <IconButton
            color="inherit"
            aria-label="Close"
            onClick={(e) => props.closeConfigurationPanel()}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <Divider />
        <div className="mt-20">
          {props.selectedNode.data.situation.situation_name}
        </div>
        <ConfigureForm
          closeConfigurationPanel={props.closeConfigurationPanel}
          elementList={props.elementList}
          selectedNode={props.selectedNode}
          situationList={props.situationList}
        ></ConfigureForm>
      </div>
    </Drawer>
  );
}
