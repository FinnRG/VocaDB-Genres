import Tree from "react-d3-tree";
import data from "../tag_tree.json";
import { useRef, useState, useEffect } from "react";

function App() {
  const shouldRecenterTreeRef = useRef(true);
  const [treeTranslate, setTreeTranslate] = useState({ x: 0, y: 0 });
  const treeContainerRef = useRef(null);

  useEffect(() => {
    const updateTranslate = () => {
      console.log("Hey");
      if (treeContainerRef.current && shouldRecenterTreeRef.current) {
        shouldRecenterTreeRef.current = false;
        // @ts-expect-error Fix later
        const dimensions = treeContainerRef.current.getBoundingClientRect();

        setTreeTranslate({
          x: dimensions.width / 2,
          y: dimensions.height / 2,
        });
      }
    };

    updateTranslate();
    window.addEventListener("resize", updateTranslate);
    return () => window.removeEventListener("resize", updateTranslate);
  }, []);

  return (
    <div ref={treeContainerRef} style={{ height: "100vh" }}>
      <Tree
        dimensions={document.getElementById("root")?.getBoundingClientRect()}
        orientation="vertical"
        separation={{ siblings: 1.7 }}
        enableLegacyTransitions
        shouldCollapseNeighborNodes
        initialDepth={0}
        translate={treeTranslate}
        data={data}
        onNodeClick={(e) => console.log(e)}
      />
    </div>
  );
}

export default App;
