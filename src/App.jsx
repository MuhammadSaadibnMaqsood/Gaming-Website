import React from "react";
import Hero from "./component/Hero";

const App = () => {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <Hero />
      <section className="h-screen bg-black w-full"></section>
    </main>
  );
};

export default App;
