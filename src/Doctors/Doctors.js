import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import AxiosAuth from "../AxiosAuth";
import { Card, Button, Loader, Header } from "semantic-ui-react";

const Doctors = () => {
  const [data, setData] = useState([]);
  const [url, setUrl] = useState(
    "https://immu-tracker2.herokuapp.com/api/doctors"
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await AxiosAuth().get(url);
      setData(result.data);
      setIsLoading(false);
    };

    fetchData();
  }, [url]);

  return (
    <Fragment>
      <h1>Welcome Doctors</h1>
      {isLoading ? (
        <Fragment>
          <Loader active inline className="slow red" />
        </Fragment>
      ) : (
        <Card.Group>
          {data.map(d => (
            <Card key={d.id}>
              <Card.Content
                header={d.name}
                meta={d.username}
                description={`Welcome dr!`}
              />
              <Card.Content extra>
                <div className="ui two buttons">
                  <Button
                    onClick={() =>
                      setUrl(
                        `https://immu-tracker2.herokuapp.com/api/${d.id}/records`
                      )
                    }
                  >
                    Go to Patients
                  </Button>
                </div>
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
      )}
    </Fragment>
  );
};

export default Doctors;
