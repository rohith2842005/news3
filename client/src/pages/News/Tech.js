import React, { useEffect, useState } from "react";
import "./News.css";

const Tech= () => {
  const [mynews, setMyNews] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://api.thenewsapi.com/v1/news/all?api_token=CPKBJBREuiGTMfkfAe2YMWStCdOGsRJ5uiEABLte&categories=tech&language=en"
      );
      const data = await response.json();
      setMyNews(data.data || []);
    } catch (err) {
      setMyNews([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="mainDiv">
        {mynews.map((ele, idx) => (
          <div
            className="card"
            key={ele.uuid || idx}
            style={{
              width: "350px",
              height: "450px",
              marginLeft: "4rem",
              marginTop: "2rem",
            }}
          >
            <img
              src={
                ele.image_url
                  ? ele.image_url
                  : `https://source.unsplash.com/400x200/?technology,cybersecurity&sig=${idx}`
              }
              className="card-img-top"
              alt="Article Visual"
              style={{ maxHeight: "200px", objectFit: "cover" }}
            />
            <div className="card-body">
              <h5 className="card-title">{ele.title}</h5>
              <p className="card-time">
                {ele.published_at
                  ? new Date(ele.published_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  : ""}
              </p>
              <p className="card-text">{ele.source || ele.source_domain || ""}</p>
              <a
                href={ele.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Read More
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default Tech;