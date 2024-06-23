import StoreLogo from '@/app/ui/store-logo';
import LoginForm from '@/app/ui/login-form';

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-lg bg-gray-800 rounded-lg shadow-lg p-6 md:p-8 text-white">
        <div className="flex items-center justify-center mb-6">
          <div className="w-20 md:w-24">
            <StoreLogo />
          </div>
        </div>
        <div className="mb-6">
      
          <p className="text-sm text-gray-400 text-center">
            Log in to your account
          </p>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
