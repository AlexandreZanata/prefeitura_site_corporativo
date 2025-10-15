import React from 'react';
import { createRoot } from 'react-dom/client'; // Importe createRoot

// Componente para os cartões de serviço
const ServiceCard = ({ icon, title, text, link }) => (
    <div className="col-md-4 mb-4">
        <div className="card h-100 text-center shadow-sm border-0 service-card">
            <div className="card-body">
                <div className="icon-circle bg-primary text-white mb-3">
                    <i className={`fas ${icon} fa-2x`}></i>
                </div>
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{text}</p>
                <a href={link} className="btn btn-outline-primary">Acessar</a>
            </div>
        </div>
    </div>
);

// Componente para os cartões de notícias
const NewsCard = ({ image, title, text }) => (
    <div className="col-md-4 mb-4">
        <div className="card shadow-sm border-0 h-100">
            <img src={image} className="card-img-top" alt={title} />
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{text}</p>
                <a href="#" className="btn btn-link">Leia mais</a>
            </div>
        </div>
    </div>
);


// Componente Principal da Página Inicial
function HomePage() {
    return (
        <>
            {/* Seção Hero */}
            <div className="hero-section text-center text-white py-5">
                <div className="container">
                    <h1 className="display-4 fw-bold">Bem-vindo ao Portal da Prefeitura</h1>
                    <p className="lead col-lg-8 mx-auto">
                        Aqui você encontrará notícias, serviços e informações sobre a nossa cidade.
                    </p>
                </div>
            </div>

            {/* Seção de Serviços */}
            <div className="container my-5">
                <h2 className="text-center mb-4">Acesso Rápido</h2>
                <div className="row">
                    <ServiceCard
                        icon="fa-file-invoice-dollar"
                        title="IPTU e Taxas"
                        text="Emita a 2ª via do seu carnê de IPTU e outras taxas municipais."
                        link="/servicos/iptu"
                    />
                    <ServiceCard
                        icon="fa-calendar-check"
                        title="Agendamentos"
                        text="Agende atendimentos em diversas secretarias de forma online."
                        link="/servicos/agendamento"
                    />
                    <ServiceCard
                        icon="fa-info-circle"
                        title="Portal da Transparência"
                        text="Acompanhe as receitas e despesas do município com clareza."
                        link="/transparencia"
                    />
                </div>
            </div>

            {/* Seção de Notícias */}
            <div className="bg-light py-5">
                <div className="container">
                    <h2 className="text-center mb-4">Últimas Notícias</h2>
                    <div className="row">
                        <NewsCard
                            image="https://via.placeholder.com/400x250/007BFF/FFFFFF?text=Notícia+1"
                            title="Prefeitura inicia obras de pavimentação no bairro A"
                            text="As obras visam melhorar a infraestrutura local e a qualidade de vida dos moradores."
                        />
                        <NewsCard
                            image="https://via.placeholder.com/400x250/28A745/FFFFFF?text=Notícia+2"
                            title="Novas vagas abertas para matrículas na rede municipal"
                            text="A Secretaria de Educação anunciou a abertura de 500 novas vagas para o próximo ano letivo."
                        />
                        <NewsCard
                            image="https://via.placeholder.com/400x250/FFC107/000000?text=Notícia+3"
                            title="Campanha de vacinação contra a gripe atinge meta"
                            text="Mais de 20 mil cidadãos foram imunizados durante a campanha deste ano, superando as expectativas."
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default HomePage;

const container = document.getElementById('home-page-react');
if (container) {
    const root = createRoot(container);
    root.render(
        <React.StrictMode>
            <HomePage />
        </React.StrictMode>
    );
}
