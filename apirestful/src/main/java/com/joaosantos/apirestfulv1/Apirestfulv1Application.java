package com.joaosantos.apirestfulv1;

import com.joaosantos.apirestfulv1.model.Autor;
import com.joaosantos.apirestfulv1.model.Projeto;
import com.joaosantos.apirestfulv1.model.Usuario;
import com.joaosantos.apirestfulv1.repository.AutorRepository;
import com.joaosantos.apirestfulv1.repository.ProjetoRepository;
import com.joaosantos.apirestfulv1.repository.UsuarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

/**
 * Classe principal que inicia a aplicação Spring Boot.
 */
@SpringBootApplication
public class Apirestfulv1Application {

	/**
	 * Método principal que é o ponto de entrada da aplicação.
	 */
	public static void main(String[] args) {
		SpringApplication.run(Apirestfulv1Application.class, args);
	}

	/**
	 * CommandLineRunner é um bean que é executado uma vez, logo após o início da aplicação.
	 * Usamos ele aqui para popular o banco de dados com dados iniciais para teste e desenvolvimento.
	 * @param autorRepository Repositório para salvar autores.
	 * @param projetoRepository Repositório para salvar projetos.
	 * @param usuarioRepository Repositório para salvar usuários.
	 * @param passwordEncoder Componente para criptografar senhas.
	 * @return A lógica a ser executada.
	 */
	@Bean
	CommandLineRunner initDatabase(AutorRepository autorRepository,
								   ProjetoRepository projetoRepository,
								   UsuarioRepository usuarioRepository,
								   PasswordEncoder passwordEncoder) {
		return args -> {
			System.out.println(">>> LIMPANDO DADOS ANTIGOS...");
			projetoRepository.deleteAll();
			usuarioRepository.deleteAll();
			autorRepository.deleteAll();

			System.out.println(">>> INSERINDO DADOS INICIAIS...");

			// --- 1. Criação do Autor (garantindo que seja único) ---
			Autor autor1 = new Autor("João Santos");
			Autor autor2 = new Autor("Carlos Ribeiro");
			autorRepository.saveAll(List.of(autor1, autor2));

			// --- 2. Criação dos Usuários ---
			Usuario rootUser = new Usuario("root", passwordEncoder.encode("password"), "ADMIN");
			Usuario regularUser = new Usuario("user", passwordEncoder.encode("12345678"), "USER");
			usuarioRepository.saveAll(List.of(rootUser, regularUser));

			// --- 3. Criação dos Projetos ---
			Projeto proj1 = new Projeto("pne.png", "Painel PNE", "Painel do Plano Nacional de Energia 2050.", "https://dashboard.epe.gov.br/apps/pne/shiny.html", true, LocalDate.of(2023, 5, 10), autor1);
			Projeto proj2 = new Projeto("inova-e.png", "inova-e: Investimentos", "Dashboard de investimentos em Pesquisa & Desenvolvimento.", "https://dashboard.epe.gov.br/apps/inova-e/dashboard.html", true, LocalDate.of(2023, 8, 22), autor1);
			Projeto proj3 = new Projeto("inova-e.png", "inova-e: Módulo de Patentes", "Módulo de análise de patentes do setor energético.", "https://dashboard.epe.gov.br/apps/inova-e/patentes.html", false, LocalDate.of(2023, 11, 5), autor1);
			Projeto proj4 = new Projeto("surveyForm.jpg", "Formulário de Pesquisa", "Um formulário de pesquisa responsivo criado com HTML e CSS.", "https://pedroalmeida08.github.io/HTML-SurveyForm/", false, LocalDate.of(2022, 1, 15), autor1);
			Projeto proj5 = new Projeto("tributePage.jpg", "Página de Tributo", "Uma página de tributo simples e responsiva.", "https://pedroalmeida08.github.io/HTML-TributePage/", false, LocalDate.of(2022, 2, 20), autor1);

			projetoRepository.saveAll(List.of(proj1, proj2, proj3, proj4, proj5));

			System.out.println(">>> BANCO DE DADOS POPULADO COM SUCESSO <<<");
		};
	}
}