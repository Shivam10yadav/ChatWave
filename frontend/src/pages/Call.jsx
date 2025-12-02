const Call = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-black text-white">
      <div>
        <h1 className="text-4xl">Call Page Works!</h1>
        <p>Call ID from URL: {window.location.pathname}</p>
      </div>
    </div>
  );
};

export default Call;