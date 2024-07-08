import { useState, useEffect } from "react";

export const useFormattedDate = () => {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    const getFormattedDate = () => {
      const date = new Date();
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      return date.toLocaleDateString("en-US", options);
    };

    setFormattedDate(getFormattedDate());
  }, []);

  return formattedDate;
};

export const useCurrentTime = () => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const getTime = () => {
      const date = new Date();
      return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
      });
    };

    setCurrentTime(getTime());
  }, []);

  return currentTime;
};

const getDayWithSuffix = (day) => {
  if (day > 3 && day < 21) return `${day}th`;
  switch (day % 10) {
    case 1:
      return `${day}st`;
    case 2:
      return `${day}nd`;
    case 3:
      return `${day}rd`;
    default:
      return `${day}th`;
  }
};

export const useDateFormatterToLocaleString = () => {
  return (date) => {
    const options = { year: "numeric", month: "long" };
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const monthYear = dateObj.toLocaleDateString(undefined, options);
    const dayWithSuffix = getDayWithSuffix(day);
    return `${dayWithSuffix} ${monthYear}`;
  };
};
