'use client';

import React, { useState, useEffect } from "react";
import { Box, Heading, Input, Text, VStack } from "@chakra-ui/react";

const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const Timer = () => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const [chosenDate, setChosenDate] = useState(now);
  const [timeDifference, setTimeDifference] = useState({
    seconds: 0,
    minutes: 0,
    hours: 0,
    isFutureDate: false,
  });

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(event.target.value);
    newDate.setHours(0, 0, 0, 0);
    setChosenDate(newDate);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (chosenDate) {
        const currentDate = new Date();
        let differenceInMilliseconds = chosenDate.getTime() - currentDate.getTime();

        let isFutureDate = true;

        if (differenceInMilliseconds < 0) {
          differenceInMilliseconds = -differenceInMilliseconds;
          isFutureDate = false;
        }

        const seconds = Math.floor(differenceInMilliseconds / 1000) % 60;
        const minutes = Math.floor(differenceInMilliseconds / (1000 * 60)) % 60;
        const hours = Math.floor(differenceInMilliseconds / (1000 * 60 * 60));

        setTimeDifference({ seconds, minutes, hours, isFutureDate });
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [chosenDate]);

  return (
    <Box
      p={{ base: 8, md: 12, lg: 16 }}  // Increase padding for larger screens
      maxW="600px"  // Increase the maximum width for larger screens
      mx="auto"
      mt={{ base: 8, md: 12, lg: 16 }} // Increase top margin for larger screens
      boxShadow="2xl"  // Enhance the shadow for more depth
      borderRadius="lg"
      bg="gray.100"  // Slightly darker background for better contrast
    >
      <Heading
        as="h1"
        size={{ base: "xl", md: "2xl", lg: "3xl" }} // Increase font size based on screen size
        mb={8}  // Increase margin below the heading
        textAlign="center"
        color="teal.600"
      >
        Timer App
      </Heading>
      <VStack spacing={6}>  {/* Increase spacing between elements */}
        <Input
          placeholder="Select a date"
          type="date"
          value={formatDate(chosenDate)}
          onChange={handleDateChange}
          size="lg"
          borderColor="teal.500"
          focusBorderColor="teal.700"
          bg="white"
          fontSize={{ base: "md", md: "lg" }}  // Increase font size for larger screens
          p={4}  // Increase padding inside the input
        />

        <Text
          fontSize={{ base: "lg", md: "xl", lg: "2xl" }}  // Increase font size based on screen size
          color="gray.800"
          textAlign="center"
        >
          {timeDifference.isFutureDate
            ? "Time remaining until chosen date:"
            : "Time passed since the chosen date:"}
        </Text>

        <Text
          fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}  // Increase font size for the timer
          fontWeight="bold"
          color={timeDifference.isFutureDate ? "green.600" : "red.600"}
          textAlign="center"
        >
          {timeDifference.hours}h : {timeDifference.minutes}m : {timeDifference.seconds}s
        </Text>
      </VStack>
    </Box>
  );
};

export default Timer;
