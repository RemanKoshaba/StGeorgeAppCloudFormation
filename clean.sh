#!/usr/bin/env bash

set -e

readonly STACK_NAME="StGeorgeAppCloudFormation"

function deleteStack() {
    aws cloudformation delete-stack --stack-name $1
}

echo 'Deleting stack...'

deleteStack $STACK_NAME

echo 'Started Deletion Process'