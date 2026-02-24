import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminForgetPassword, adminLogin, adminResetPassword, getAdminProfile } from '../../services/authService';
import toast, { Toaster } from 'react-hot-toast';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [showForgetPassword, setShowForgetPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkExistingAuth = async () => {
      const token = localStorage.getItem('adminToken');

      if (!token) {
        setCheckingAuth(false);
        return;
      }

      try {
        // await getAdminProfile();
        navigate('/admin/dashboard');
      } catch (error) {
        localStorage.removeItem('adminToken');
        setCheckingAuth(false);
      }
    };

    checkExistingAuth();
  }, [navigate]);

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    if (!validateEmail(email)) {
      setError('البريد الإلكتروني غير صالح');
      setLoading(false)
      return;
    }
    // if (password.length < 6) {
    //   setError('كلمة المرور يجب أن لا تقل عن 6 أحرف');
    //   setLoading(false);
    //   return;
    // }
 
    // if (!passwordRegex.test(password)) {
    //   setError('كلمة المرور يجب أن لا تقل عن ٨ احرف وتحتوي على حرف كبير، حرف صغير، رقم، ورمز خاص');
    //   setLoading(false); return;
    // }

    try {
      const response = await adminLogin({ email, password });
      if (response.token) {
        localStorage.setItem('adminToken', response.token);
        navigate('/admin/dashboard');
      } else if (response.data?.token) {
        localStorage.setItem('adminToken', response.data.token);
        navigate('/admin/dashboard');
      } else {
        setError('لم يتم استلام رمز المصادقة');
      }
    } catch (err: any) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else if (err.response?.status === 401) {
        setError('البريد الإلكتروني أو كلمة المرور غير صحيحة');
      } else if (err.response?.status === 422) {
        const errors = err.response.data.errors;
        if (errors) {
          const firstError = Object.values(errors)[0];
          setError(Array.isArray(firstError) ? firstError[0] : String(firstError));
        } else {
          setError('بيانات غير صالحة');
        }
      } else if (err.message === 'Network Error') {
        setError('خطأ في الاتصال بالخادم');
      } else {
        setError('حدث خطأ أثناء تسجيل الدخول');
      }
    } finally {
      setLoading(false);
    }
  };


  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-primary text-lg">جاري التحقق...</div>
      </div>
    );
  }
  if (showForgetPassword) return <ForgetPasswordModal setShowForgetPassword={setShowForgetPassword} />
  else return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-primary mb-2">لوحة التحكم</h1>
          <p className="text-gray-600">تسجيل الدخول للمتابعة</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-center text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              البريد الإلكتروني
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
              placeholder="admin@example.com"
              autoComplete="email"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              كلمة المرور
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-[#2d4a62] cursor-pointer text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'جاري التحميل...' : 'تسجيل الدخول'}
          </button>
        </form>

        <div className="w-full flex mt-6 text-center justify-between">
          <button className="text-primary hover:underline text-sm" onClick={() => setShowForgetPassword(true)}>
            هل نسيت كلمه المرور ؟
          </button>
          <a href="/" className="text-primary hover:underline text-sm">
            العودة للموقع الرئيسي
          </a>

        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

const ForgetPasswordModal = ({
  setShowForgetPassword
}) => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [sendOtp, setSendOtp] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const navigate = useNavigate();

  const handleForgetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await adminForgetPassword({ email });
      if (response) {
        setSendOtp(true)
        setLoading(false)
      }
    } catch (err: any) {
      setError('حدث خطأ أثناء الارسال');
      setLoading(false);
    }
  };
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    // if (password.length < 6) {
    //   setError('كلمة المرور الجديدة يجب أن تكون 6 أحرف على الأقل');
    //   setLoading(false);
    //   return;
    // }

    // if (!passwordRegex.test(password)) {
    //   setError('كلمة المرور يجب أن لا تقل عن ٨ احرف وتحتوي على حرف كبير، حرف صغير، رقم، ورمز خاص');
    //   setLoading(false);
    //   return;
    // }
    if (password !== passwordConfirmation) {
      setError('كلمات المرور غير متطابقة');
      setLoading(false);
      return;
    }
    const data = {
      email: email,
      token: otp,
      password: password,
      password_confirmation: passwordConfirmation
    }
    try {
    setError('')
      const response = await adminResetPassword(data);
      if (response) {
        setLoading(false)
        if (response.status==200) {
         setShowForgetPassword(false)
         toast.success("تم تغيير كلمه المرور بنجاح ");
        } 
      }
    } catch (err: any) {
      setError('حدث خطأ أثناء الارسال');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
                  <Toaster position="bottom-right"/>
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-primary mb-2">لوحة التحكم</h1>
          <p className="text-gray-600">اعاده تعيين كلمه المرور </p>
        </div>

        <form onSubmit={sendOtp ? handleResetPassword : handleForgetPassword} className="space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-center text-sm">
              {error}
            </div>
          )}
          {!sendOtp ?
            <>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                  placeholder="admin@example.com"
                  autoComplete="email"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'جاري الارسال...' : 'ارسال كود التحقق'}
              </button>
            </>

            :
            <>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  كود التحقق المرسل
                </label>
                <input
                  type="token"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                  placeholder="123456"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  كلمه المرور الجديده
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  تاكيد كلمة المرور الجديده
                </label>
                <input
                  type="password"
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'جاري الارسال...' : 'اعاده تعيين كلمه المرور'}
              </button>
            </>

          }

        </form>

        <div className="w-full flex mt-6 text-center justify-between">
          <button className="text-primary hover:underline text-sm" onClick={() => setShowForgetPassword(false)}>
            العوده لتسجيل الدخول
          </button>
          <a href="/" className="text-primary hover:underline text-sm">
            العودة للموقع الرئيسي
          </a>

        </div>
      </div>
    </div>
  )

}