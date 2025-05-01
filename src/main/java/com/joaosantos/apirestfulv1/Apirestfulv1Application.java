package com.joaosantos.apirestfulv1;

import com.joaosantos.apirestfulv1.model.Categoria;
import com.joaosantos.apirestfulv1.model.Produto;
import com.joaosantos.apirestfulv1.repository.CategoriaRepository;
import com.joaosantos.apirestfulv1.repository.ProdutoRepository;
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
	private ProdutoRepository produtoRepository;

	@Autowired
	private CategoriaRepository categoriaRepository;

	// .run() é um método CommandLineRunner e será utilizado para popular banco de dados
	// .run() coloca no ar o servidor Tomcat
	// .run() abre e lê as configurações presentes em resources.application.properties
	public static void main(String[] args) {
		SpringApplication.run(Apirestfulv1Application.class, args);
	}

	@Override
	public void run(String... args) throws Exception {

		Categoria frutas = new Categoria("Frutas");
		categoriaRepository.save(frutas);
		Categoria legumes = new Categoria("Legumes");
		categoriaRepository.save(legumes);
		Categoria verduras = new Categoria("Verduras");
		categoriaRepository.save(verduras);

		Produto produto = new Produto(
				"abacate.png",
				"Abacate",
				"1 unidade aprox. 750g",
				true,
				100,
				BigDecimal.valueOf(2.45),
				LocalDate.of(2024, 4, 26),
				frutas);

		// Se produto for um objeto transiente, .save() chama o método persist da JPA
		// Se produto for um objeto destacado, .save() chama o método merge da JPA
		// Em tempo de compilação, .save() é procurado de ProdutoRepository pra cima
		// Em tempo de execução, .save() é procurado de ProdutoRepositoryImpl e encontra o método .save() de DAOGenericoImpl e o herda
		produtoRepository.save(produto);

		produto = new Produto(
				"abobrinha.jpg",
				"Abobrinha",
				"1 unidade aprox. 250g",
				false,
				200,
				BigDecimal.valueOf(1.1),
				LocalDate.of(2024, 5, 22),
				legumes);

		produtoRepository.save(produto);

		System.out.println("Ok!");
	}
}