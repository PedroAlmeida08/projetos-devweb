package com.joaosantos.apirestfulv1;

import com.joaosantos.apirestfulv1.model.Autor;
import com.joaosantos.apirestfulv1.model.Projeto;
import com.joaosantos.apirestfulv1.repository.AutorRepository;
import com.joaosantos.apirestfulv1.repository.ProjetoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.math.BigDecimal;
import java.time.LocalDate;

@SpringBootApplication
public class Apirestfulv1Application implements CommandLineRunner {

	// Quando o método run encontra essa anotação, cria um objeto de uma classe que implementa a
	// interface ProdutoRepository
	@Autowired
	private ProjetoRepository projetoRepository;

	@Autowired
	private AutorRepository autorRepository;

	// .run() é um método CommandLineRunner e será utilizado para popular banco de dados
	// .run() coloca no ar o servidor Tomcat
	// .run() abre e lê as configurações presentes em resources.application.properties
	public static void main(String[] args) {
		SpringApplication.run(Apirestfulv1Application.class, args);
	}

	@Override
	public void run(String... args) throws Exception {

		Autor autor1 = new Autor("João Santos");
		autorRepository.save(autor1);
		Autor autor2 = new Autor("Carlos Ribeiro");
		autorRepository.save(autor2);

		Projeto projeto = new Projeto(
				"pne.png",
				"PNE 2050",
				"Painel do Plano Nacional de Energia 2050",
				"https://dashboard.epe.gov.br/apps/pne/shiny.html",
				true,
				LocalDate.of(2024, 4, 26),
				autor1);

		// Se produto for um objeto transiente, .save() chama o método persist da JPA
		// Se produto for um objeto destacado, .save() chama o método merge da JPA
		// Em tempo de compilação, .save() é procurado de ProdutoRepository pra cima
		// Em tempo de execução, .save() é procurado de ProdutoRepositoryImpl e encontra o método .save() de DAOGenericoImpl e o herda
		projetoRepository.save(projeto);

		projeto = new Projeto(
				"inova-e.png",
				"inova-e",
				"Módulo de PD&D do inova-e",
				"https://dashboard.epe.gov.br/apps/inova-e/dashboard.html",
				true,
				LocalDate.of(2024, 4, 26),
				autor1);

		projetoRepository.save(projeto);

		projeto = new Projeto(
				"inova-e.png",
				"inova-e",
				"Módulo de Patentes do inova-e",
				"https://dashboard.epe.gov.br/apps/inova-e/patentes.html",
				true,
				LocalDate.of(2024, 4, 26),
				autor1);

		projetoRepository.save(projeto);

		projeto = new Projeto(
				"surveyForm.jpg",
				"Formulário de Pesquisa",
				"Formulário de Pesquisa - freecodecamp",
				"https://pedroalmeida08.github.io/HTML-SurveyForm/",
				true,
				LocalDate.of(2024, 4, 26),
				autor1);

		projetoRepository.save(projeto);

		projeto = new Projeto(
				"tributePage.jpg",
				"Página de Tributo",
				"Página de Tributo ao Dr. Norman Bourlaug",
				"https://pedroalmeida08.github.io/HTML-TributePage/",
				true,
				LocalDate.of(2024, 4, 26),
				autor1);

		projetoRepository.save(projeto);

		System.out.println("Ok!");
	}
}