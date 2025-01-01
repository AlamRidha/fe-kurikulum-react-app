const AuthLayout = (props) => {
  const { title, children } = props;
  return (
    <div className="flex justify-center min-h-screen items-center">
      <div className="w-full max-w-sm p-4 bg-slate-300 rounded-xl">
        <h1 className="text-3xl font-bold mb-2 text-blue-600 text-center ">
          {title}
        </h1>
        <p className="font-medium text-slate-500 mb-11 text-center">
          Selamat Datang, Silahkan Login!
        </p>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
