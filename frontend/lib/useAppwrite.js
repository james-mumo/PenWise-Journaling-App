import { Alert } from "react-native";
import { useEffect, useState } from "react";

// custome hook to fetch data with
const useAppwrite = (fn) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fn();
      setData(res);
      console.log(res);
    } catch (error) {
      console.log({ msg: "Datafetch-error", error });
      Alert.alert("DataFetch-Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => fetchData();

  return { data, loading, refetch };
};

export default useAppwrite;
