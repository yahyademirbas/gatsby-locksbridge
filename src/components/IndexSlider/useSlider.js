import * as React from "react";
import useInterval from "./useInterval";

function useSlider({
                     total = 0,
                     enabled = false,
                     useLoaded = false,
                     speed = 3000,
                     loop = true
                   }) {
  // const offset = React.useRef(0);
  const [offset, setOffset] = React.useState(0);
  const [items, setItems] = React.useState([]);

  function incrementOffset() {
    if (offset === total - 1) {
      setOffset(loop ? 0 : offset);
    } else {
      setOffset(offset + 1);
    }
  }

  function addItem(ref) {
    setItems([...items, ref]);
  }

  const loaded = useLoaded ? items.length === total : true;

  useInterval(() => {
    if (loaded && enabled && offset < total) {
      incrementOffset();
    }
  }, speed);

  return { offset, addItem };
}

export default useSlider;
