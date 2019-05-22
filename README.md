# StGeorgeAppCloudFormation

Cloud Formation Template used to create the infrastructure for the St George App

To deploy this to AWS you'll need to set up AWS SAM (Serverlss Application Model)

##Steps to deploy

1. Create the S3 bucket you'll be using to store the Cloud Formation template in

   ```aws s3 mb s3://st-george-app-cloud-formation-template-bucket```

2. Package the template into the s3 bucket

   ```sam package --output-template-file packaged.yaml --s3-bucket st-george-app-cloud-formation-template-bucket```

3. Deploy the template to cloud formation and create the resources

   ```sam deploy --template-file packaged.yaml --stack-name StGeorgeAppCloudFormation --capabilities CAPABILITY_IAM```

##Cleaning

If you would like to delete the stack via the cli, run the following command:

   aws cloudformation delete-stack --stack-name StGeorgeAppCloudFormation

###Running the scripts

Alternatively, if you don't want to type these commands ever time, you can run the shell scripts to deploy the changes, and clean the deployed changes.

####Creating the Stack

Simply run the command
```./deploy.sh```
and the stack will be created onto AWS

####Cleaning the stack

Simply run the command
```./clean.sh```
and the stack deletion process will begin
