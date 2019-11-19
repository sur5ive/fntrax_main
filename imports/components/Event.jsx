import React from 'react';
import NotificationAlert from 'react-notification-alert';

export default class Event extends React.Component {
    
    componentDidUpdate(prevProps) {
        if (JSON.stringify(prevProps.fixture) !== JSON.stringify(this.props.fixture)) {
            this.notify("Yo man!");
        }
    }

    notify = message => {
        let options = {
            place: "bl",
            message: (
                <div>
                <div>
                    {message}
                </div>
                </div>
            ),
            type: "success",
            icon: "tim-icons icon-satisfied",
            autoDismiss: 5
        };
        this.refs.notificationAlert.notificationAlert(options);
    };

    render() {
        return (
            <div className="react-notification-alert-container">
                <NotificationAlert ref="notificationAlert" />
            </div>
        );
    }
}