import React from 'react';

interface HeaderNavProps {
    active: number;
}

const HeaderNav: React.FC<HeaderNavProps> = ({ active }) => {
    return(
        <div className="nav-information">
            <ul className="breadcrumb">
                <li className={`info-cart ${active === 1 && 'ativo'}`}>
                    <span>1</span>
                    <div className="info-sm">
                        Carrinho
                    </div>
                    <div className="info-md">
                        Revise seu carrinho
                    </div>
                </li>
                <li className={`info-order ${active === 2 && 'ativo'}`}>
                    <span>2</span>
                    <div className="info-sm">
                        Pagamento
                    </div>
                    <div className="info-md">
                        Pagamento e Pedido
                    </div>
                </li>
                <li className={`info-payment ${active === 3 && 'ativo'}`}>
                    <span>3</span>
                    <div className="info-sm">
                        Status
                    </div>
                    <div className="info-md">
                        Status do Pagamento
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default HeaderNav;