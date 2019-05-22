#!/usr/bin/env bash

set -e

readonly STACK_NAME="StGeorgeAppCloudFormation"
readonly CF_BUCKET_NAME="st-george-app-cloud-formation-template-bucket"

function createS3Bucket() {
    command="aws s3 mb s3://"
    command+=$1
    eval $command
}

function package() {
    sam package --output-template-file packaged.yaml --s3-bucket $1
}

function deploy() {
    sam deploy --template-file packaged.yaml --stack-name $1 --capabilities CAPABILITY_IAM
}


echo 'Creating S3 bucket...'

createS3Bucket $CF_BUCKET_NAME

echo 'Packaging stack...'

package $CF_BUCKET_NAME

echo 'Deploying Stack'

deploy $STACK_NAME