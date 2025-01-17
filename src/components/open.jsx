const Open = () => {
  return (
    <div className="relative h-[600px] bg-[url('/g.gif')] bg-no-repeat bg-cover bg-center flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-50"></div>{" "}
      {/* Dark overlay */}
      <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-semibold z-10 text-center">
        پروژه ثبت و مدیریت رکوردها
      </h1>
    </div>
  );
};

export default Open;
