import { useState, useEffect } from 'react';
import { Card, Row, Col, Input } from 'antd';
import { useGetCryptosQuery } from '../services/CryptoApi';
import millify from 'millify';
import { Link } from 'react-router-dom';

const Cryptocurrencies = ({ simplified }) => {
    const { data: cryptoList, isFetching } = useGetCryptosQuery(simplified ? 10 : 50);
    const [cryptos, setCryptos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const filteredData = cryptoList?.data?.coins.filter(currency => currency.name.toLowerCase().includes(searchTerm.toLowerCase()));
        console.log(filteredData);
        setCryptos(filteredData);
    }, [searchTerm, cryptoList])

    if (isFetching) return 'Loading...';

    return (
        <div style={{ padding: '1rem' }}>
            { !simplified && (
                <div className='search-crypto'>
                    <Input placeholder='Search Cryptocurrency' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
                </div>
            ) }
            <Row gutter={[32, 32]} className='crypto-card-container'>
                { cryptos?.map((currency) => (
                    <Col key={currency.uuid} xs={24} md={12} lg={6} className='crypto-card'>
                        <Link to={`/crypto/${currency.uuid}/`}>
                            <Card
                                title={`${currency.rank}. ${currency.name}`}
                                extra={<img className='crypto-image' src={currency.iconUrl} />}
                                hoverable
                            >
                                <p>Price: {millify(currency.price)}</p>
                                <p>Market Cap: {millify(currency.marketCap)}</p>
                                <p>Daily Change: {millify(currency.change)}</p>
                            </Card>
                        </Link>
                    </Col>
                )) }
            </Row>
        </div>
    );
}

export default Cryptocurrencies;