import React from 'react';
import Header from './components/Header';
import ChirpSynthesizer from './components/ChirpSynthesizer';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4">
        <ChirpSynthesizer />
      </main>
      <Footer />
    </div>
  );
}

export default App;