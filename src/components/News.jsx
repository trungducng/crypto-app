import { useState, useEffect } from "react";
import moment from "moment";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";

import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { useGetCryptosQuery } from "../services/cryptoApi";

const { Title, Text } = Typography;
const { Option } = Select;

const demoImage =
  "http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg";

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 12,
  });
  const { data } = useGetCryptosQuery(100);
  // const [cryptoNews, setCryptoNews] = useState(data?.value);

  // useEffect(() => {
  //   setCryptoNews(data?.value);
  // }, [data, isFetching]);

  console.warn("DATA ", cryptoNews);
  if (isFetching) return "Loading...";

  return (
    <>
      <Row gutter={[24, 24]} className="crypto-card-container">
        {!simplified && (
          <Col span={24}>
            <Select
              showSearch
              className="select-news"
              placeholder="Select a crypto"
              optionFilterProp="children"
              onChange={(value) => setNewsCategory(value)}
              filterOption={(input, option) =>
                option?.children.toLowerCase().indexOf(input.toLowerCase()) > 0
              }
            >
              {data?.data?.coins.map((coin) => (
                <Option value={coin.name}>{coin.name}</Option>
              ))}
            </Select>
          </Col>
        )}
        {cryptoNews?.value.map((news, i) => (
          <Col xs={24} sm={12} lg={8} key={i}>
            <Card hoverable className="news-card">
              <a href={news.url} target="_blank">
                <div className="news-image-container">
                  <Title className="news-title" level={4}>
                    {news.name}
                  </Title>
                  <img
                    style={{ maxWidth: "200px", maxHeight: "100px" }}
                    src={news?.image?.thumbnail?.contentUrl || demoImage}
                    alt="news"
                  />
                </div>
                <p>
                  {news?.description > 100
                    ? `${news?.description.substring(0, 100)}...`
                    : news?.description}
                </p>
                <div className="provider-container">
                  <div>
                    <Avatar
                      src={
                        news?.provider[0]?.image?.thumbnail?.contentUrl ||
                        demoImage
                      }
                      alt="news"
                    />
                    <Text>
                      {moment(news?.datePublished).startOf("ss").fromNow()}
                    </Text>
                  </div>
                </div>
              </a>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default News;
