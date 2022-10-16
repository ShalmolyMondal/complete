echo "Pushing to REMOTE"

git add . && git commit 

echo "Enter Branch Name:"
read BRANCH
echo $BRANCH
# git push origin $BRANCH