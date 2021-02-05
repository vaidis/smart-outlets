#!/bin/bash

pins=(16 20 21)
delay=0.2
echo -e "EXPORT: \c"
for pin in "${pins[@]}"; do
	echo $pin > /sys/class/gpio/export
	echo -e "${pin} \c"
done; echo;
echo -e "DIRECTION: \c"
for pin in "${pins[@]}"; do
	echo out > /sys/class/gpio/gpio${pin}/direction
	echo -e "${pin} \c"
done; echo;
echo -e "VALUE 1: \c"
for pin in "${pins[@]}"; do
	echo 1 >  /sys/class/gpio/gpio${pin}/value
	echo -e "${pin} \c"
	sleep $delay
done; echo; sleep 5
echo -e "VALUE 0: \c"
for pin in "${pins[@]}"; do
	echo 0 >  /sys/class/gpio/gpio${pin}/value
	echo -e "${pin} \c"
	sleep $delay
done; echo; sleep 5
echo -e "UNEXPORT: \c"
for pin in "${pins[@]}"; do
	echo $pin > /sys/class/gpio/unexport
	echo -e "${pin} \c"
	sleep $delay
done; echo

