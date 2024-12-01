import { observer } from 'mobx-react-lite';
import { FormEvent, useState } from 'react';
import { loginStore, LoginStore } from '../store/loginStore';

export const LoginForm = observer(() => { //(loginStore: LoginStore) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    loginStore.login(username, password);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div><h2>Вход в систему</h2></div>
      <div>
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <div>
        <button type="submit">Вход</button>
      </div>
    </form>
  );
});