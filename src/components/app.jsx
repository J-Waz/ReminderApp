import React, { Component } from "react";
import { connect } from "react-redux";
import { addReminder, deleteReminder, clearReminders } from "../actions";
import moment from 'moment'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      dueDate: "",
    };
  }
  addReminder() {
    //console.log("this", this);
    console.log("this.state.dueDate", this.state.dueDate);
    this.props.addReminder(this.state.text, this.state.dueDate);
  }

  deleteReminder(id) {
    console.log("deleting in application", id);
    console.log("this.props", this.props);
    this.props.deleteReminder(id);
  }

  renderReminders() {
    const { reminders } = this.props;
    return (
      <ul className="list-group col-sm-4">
        {reminders.map((reminder) => {
          return (
            <li key={reminder.id} className="list-group-item">
              <div className="list-item">
              <div>{reminder.text}</div>
              <div><em>{moment(new Date(reminder.dueDate)).fromNow()}</em></div>
              </div>
              <div
                className="list-item delete-button"
                onClick={() => this.deleteReminder(reminder.id)}
              >
                &#x2715;
              </div>
            </li>
          );
        })}
      </ul>
    );
    //console.log('reminders:', reminders);
  }

  render() {
    //console.log('this.props', this.props);
    return (
      <div className="App">
        <div className="title">Reminder Pro</div>
        <div className="form-inline reminder-form">
          <div className="form-group">
            <input
              onChange={(event) => this.setState({ text: event.target.value })}
              className="form-control"
              placeholder="I have to..."
            />
            <input
              className="form-control"
              type="datetime-local"
              onChange={(event) =>
                this.setState({ dueDate: event.target.value })
              }
            ></input>
          </div>
          
          <button
            onClick={() => this.addReminder()}
            type="button"
            className="btn btn-success"
          >
            Add Reminder
          </button>
          <div 
        className="btn btn-danger"
        onClick={() => this.props.clearReminders()}>
          Clear
        </div>
        </div>
        {this.renderReminders()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  //console.log('state', state);
  return {
    reminders: state,
  };
}

export default connect(mapStateToProps, { addReminder, deleteReminder, clearReminders })(App);
