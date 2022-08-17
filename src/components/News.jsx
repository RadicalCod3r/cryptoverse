import { useState } from 'react';
import { useGetCryptoNewsQuery } from '../services/CryptoNewsApi';
import { Row, Col, Card, Typography, Select, Avatar } from 'antd';
import moment from 'moment';
import { useGetCryptosQuery } from '../services/CryptoApi';


const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

const { Text, Title } = Typography;
const { Option } = Select;

const News = ({ simplified }) => {
    const [newsCategory, setNewsCategory] = useState('Cryptocurrency');

    const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory, count: simplified ? 6 : 10 });
    const { data: cryptoList } = useGetCryptosQuery(50);

    if (!cryptoNews?.value) return 'Loading...';
    if (!cryptoList?.data) return 'Loading...';

    return (
        <div style={{ padding: '1rem' }}>
            <Row gutter={[24, 24]}>
                <Col span={24}>
                    { !simplified && (
                        <Select
                            showSearch
                            className='select-news'
                            placeholder='Select a Crypto'
                            optionFilterProp='children'
                            onChange={(value) => setNewsCategory(value)}
                            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase())}
                        >
                            <Option value='Cryptocurrency'>Cryptocurrency</Option>
                            { cryptoList?.data?.coins.map((coin) => <Option value={coin.name}>{ coin.name }</Option>) }
                        </Select>
                    ) }
                </Col>
                { cryptoNews?.value.map((news, i) => (
                    <Col key={i} xs={24} md={12} lg={8}>
                        <Card hoverable className='news-card'>
                            <a href={news.url} target='_blank' rel='noreferrer'>
                                <div className='news-image-container'>
                                    <Title className='news-title' level={4}>{ news.name }</Title>
                                    <img style={{maxWidth: '200px', maxHeight: '100px'}} src={news?.image?.thumbnail?.contentUrl || demoImage} alt='news' />
                                </div>
                                <p>
                                    {
                                        news?.description.length > 100
                                        ?
                                        `${news.description.substring(0, 100)}...`
                                        :
                                        news.description
                                    }
                                </p>
                                <div className='provider-container'>
                                    <div>
                                        <Avatar src={news?.provider[0]?.image?.thumbnail?.contentUrl || demoImage} />
                                        <Text className='provider-name'>{ news.provider[0].name }</Text>
                                    </div>
                                    <Text>{ moment(news.datePublished).startOf('ss').fromNow() }</Text>
                                </div>
                            </a>
                        </Card>
                    </Col>
                )) }
            </Row>
        </div>
    );
}

export default News;