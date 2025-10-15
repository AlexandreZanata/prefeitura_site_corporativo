import React from 'react';
import HeroSection from '../components/modules/HeroSection';
import ServiceCard from '../components/modules/ServiceCard';
import NewsCard from '../components/modules/NewsCard';

function HomePage() {
    return (
        <>
            <HeroSection
                title="Sorriso: Trabalho e Prosperidade"
                subtitle="O portal do cidadão para serviços, notícias e transparência."
                imageUrl="https://cidade-sorriso.mt.gov.br/storage/image_manager/Iq9n1z08pUuA4221.jpeg" // Imagem real de Sorriso
            />

            <div id="servicos" className="container my-5 py-5">
                <div className="text-center">
                    <h2 className="section-title">Acesso Rápido a Serviços</h2>
                </div>
                <div className="row justify-content-center">
                    <ServiceCard
                        icon="fa-file-invoice-dollar"
                        title="IPTU e Taxas"
                        text="Emita a 2ª via do seu carnê de IPTU e outras taxas municipais."
                        link="/servicos/iptu"
                    />
                    <ServiceCard
                        icon="fa-calendar-check"
                        title="Agendamentos Online"
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

            <div className="py-5" style={{ backgroundColor: '#F5F5F5' }}>
                <div className="container">
                    <div className="text-center">
                        <h2 className="section-title">Últimas Notícias</h2>
                    </div>
                    <div className="row">
                        <NewsCard
                            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz-kGgYp7E-zZ5wY6Xy_Q8a_8bZ9J7c5tXw&s"
                            title="Colheita de milho safrinha avança e supera expectativas em Sorriso"
                            text="Produtores locais comemoram a produtividade acima da média na safra deste ano."
                            category="Agronegócio"
                        />
                        <NewsCard
                            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz-kGgYp7E-zZ5wY6Xy_Q8a_8bZ9J7c5tXw&s"
                            title="Prefeitura anuncia construção de duas novas escolas na área urbana"
                            text="A Secretaria de Educação confirmou o início das obras para o próximo semestre."
                            category="Educação"
                        />
                        <NewsCard
                            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz-kGgYp7E-zZ5wY6Xy_Q8a_8bZ9J7c5tXw&s"
                            title="Campanha de vacinação contra a gripe é prorrogada até o fim do mês"
                            text="Cidadãos que ainda não se imunizaram têm uma nova oportunidade nos postos de saúde."
                            category="Saúde"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default HomePage;
