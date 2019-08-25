#!/bin/bash

if [ "no" = "yes" ]; then
  echo "PROBLEM..."
else
  echo "NO PROBLEM!"
fi


no="no"
yes="yes"

if [ "$no" = "$yes" ]; then
  echo "PROBLEM BIS..."
fi