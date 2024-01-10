import AuthForm from '../components/AuthForm';
import { json, redirect } from 'react-router-dom';

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({request}) {
  const searchParams = new URL(request.url).searchParams;

  const mode = searchParams.get('mode') || 'login'; //If the mode parameter doesn't exist, it defaults to 'login'.

  if (mode !== 'login' && mode !== 'signup') {
    throw json({ message: 'Invalid mode' }, { status: 422 });
  }

  const data = await request.formData();
  const authData = {
    email: data.get('email'),
    password: data.get('password'),
  };

  const response = await fetch(`http://localhost:8080/${mode}`, {
    method: 'POST',
    body: JSON.stringify(authData),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.status === 422 || response.status === 500) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "could not authenticate user" }, { status: 500 });
  }

  const resData = await response.json();
  const token = resData.token;

  localStorage.setItem('token', token);

  return redirect('/');

}