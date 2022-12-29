import React from "react";
import { Button, Card } from "antd";
import { useSelector } from "react-redux";
import { Typography } from "antd";
const { Title, Text, Paragraph } = Typography;



const JobCard = () => {
    let selectedJob = useSelector((state) => state.jobs.selectedJob);
    return (
        <Card
            bodyStyle={{ overflowY: 'auto', height: '60vh' }}
            actions={[
                <Button
                    href={selectedJob.URL}
                    target='_blank'
                    type="primary"
                    style={{ width: '7rem', color: 'white', }}>
                    Apply Here
                </Button>
            ]}
        >
            <Title level={2} >{selectedJob.title}</Title>
            <Text strong style={{ fontSize: '1.2rem' }}> Company: {selectedJob.company}</Text>
            <Text strong style={{ fontSize: '1.2rem', display: 'block', paddingBottom: '1rem' }}> Location: {selectedJob.location}</Text>

            <Paragraph style={{ fontSize: '1rem' }}>{selectedJob.details}</Paragraph>

        </Card>

    );
}

export default JobCard;