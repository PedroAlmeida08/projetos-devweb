import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useEfetuarLogin from "../hooks/useEfetuarLogin";
import useUsuarioStore from "../store/UsuarioStore";
import { type Usuario } from '../interfaces/Usuario';
import { type TokenResponse } from '../interfaces/TokenResponse';

const LoginForm: React.FC = () => {
  const setUsuarioLogado = useUsuarioStore((s) => s.setUsuarioLogado);
  const [loginInvalido, setLoginInvalido] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<Usuario>();
  const { mutate: efetuarLogin, isError, error } = useEfetuarLogin();

  const submit = (usuario: Usuario) => {
    setLoginInvalido(false);
    efetuarLogin(usuario, {
      onSuccess: (tokenResponse: TokenResponse) => {
        if (tokenResponse.token > 0) {
          setUsuarioLogado(tokenResponse.token);
          const destino = location.state?.destino || "/";
          navigate(destino);
        } else {
          setLoginInvalido(true);
        }
      },
      onError: () => {
        setLoginInvalido(true);
      }
    });
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit(submit)}>
      {loginInvalido && (
        <div className="alert alert-danger fw-bold" role="alert">
          Login inválido!
        </div>
      )}

      {isError && error && (
        <div className="alert alert-danger fw-bold" role="alert">
          Erro ao tentar efetuar login: {error.message}
        </div>
      )}

      <div className="row mb-2">
        <label htmlFor="conta" className="col-lg-1 fw-bold mb-2">Conta</label>
        <div className="col-lg-5">
          <input {...register("conta")} type="text" id="conta" className="form-control form-control-sm" />
        </div>
      </div>

      <div className="row mb-3">
        <label htmlFor="senha" className="col-lg-1 fw-bold mb-2">Senha</label>
        <div className="col-lg-5">
          <input {...register("senha")} type="password" id="senha" className="form-control form-control-sm" />
        </div>
      </div>

      <div className="row">
        <div className="offset-lg-1 col-lg-5">
          {/* ✅ Imagem removida do botão */}
          <button type="submit" className="btn btn-outline-primary">
            Entrar
          </button>
        </div>
      </div>

      <p className="mt-3 text-center">
        Não tem uma conta? <Link to="/cadastrar">Cadastre-se aqui</Link>
      </p>
    </form>
  );
};
export default LoginForm;