// import FeedbackWidget from "@/components/WidgetFaces";
import SimpleFeedbackWidget from "@/components/WidgetFaces";

function App() {
  return (
    <>
      <div>
        <SimpleFeedbackWidget
          projectId={19}
          allowedRoutes={["/", "/dashboard"]}
          displayAfter={2}
        />
      </div>
    </>
  );
}

export default App;
