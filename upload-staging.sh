#Auto Deployment - Do Not Mess around this file
#chmod 600 MLTrain.pem && \

uservar="ubuntu"
ipvar="3.15.61.250"
deployloc="/home/ubuntu/fidelity-pet-insurance"
dest="/home/ubuntu/fidelity-pet-insurance"
customSSH="ssh fidelity-staging"

echo Copying from Local to server
scp -r "./pages" "./public" "./api" "./components" "./layout" "./context" "./utils" "./validation" "./styles" "package.json" "package-lock.json"  "upload-staging.sh" "next.config.js" ".prettierrc.yaml" "jsconfig.json" "fidelity":$deployloc
echo Copying done
$customSSH "cd $dest; npm install; npm run build;"
echo Executing
echo Done

# ******************above line 4 -15 is for staging server********************

# ******************below line 23 -35 is for production server********************


#pemvar='MLTrain.pem'
# uservar="ubuntu"
# ipvar="3.15.61.250"
# deployloc="/home/ubuntu/fidelity-pet-insurance"
# dest="/home/ubuntu/fidelity-pet-insurance"
# customSSH="ssh fidelity"

# echo Copying from Local to server
# scp -r "./pages" "./public" "./api" "./components" "./layout" "./context" "./utils" "./validation" "./styles" "package.json" "package-lock.json"  "upload-staging.sh" "next.config.js" ".prettierrc.yaml" "jsconfig.json" "fidelity":$deployloc
# echo Copying done
# $customSSH "cd $dest; npm install; npm run build;"
# echo Executing
# # $customSSH  "sudo service apache2 restart"
# echo Done

