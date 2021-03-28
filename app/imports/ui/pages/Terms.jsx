import React from 'react';
import { Container, Header } from 'semantic-ui-react';

/** Render a Not Found page if the user enters a URL that doesn't match any route. */
class Terms extends React.Component {
  render() {
    return (
        <div>
          <Container style={{ paddingLeft: '20px', paddingRight: '20px', paddingBottom: '70px' }}>
            <Header as="h1" textAlign="left">TERMS OF SERVICE</Header><br/>
            <Header as="h4" textAlign="left" style={{ marginTop: '-10px' }}>Last updated: (March 22, 2021)</Header>
            <p style={{ marginTop: '0px' }}>
              Thanks for using Budget Tracker! These terms of service (the &quot;Agreement&quot;) cover your use and
              service operated by BudgetTracker Inc. Along with this Agreement, our&nbsp;
              explains how we use, protect and store any personal
              information that you may provide to us while using BudgetTracker.
            </p><br/>
            <Header as="h2" textAlign="left" style={{ marginTop: '-10px' }}>Acceptance of Terms</Header>
            <p style={{ marginTop: '0px' }}>
              By using the BudgetTracker application, service, and website (collectively, the &quot;Services&quot;), you
              agree and acknowledge that you have read and accepted the terms and conditions of this Agreement.
            </p><br/>
            <Header as="h4" textAlign="left" style={{ marginTop: '-10px' }}>
              This Agreement applies to everyone who uses our services and you cannot use our services unless you accept
              this Agreement.
            </Header>
            <br/>
            <Header as="h4" textAlign="left" style={{ marginTop: '-10px' }}>YOUR RESPONSIBILITIES</Header><br/>
            <Header as="h4" textAlign="left" style={{ marginTop: '-10px' }}>Your BudgetTracker</Header>
            <p style={{ marginTop: '0px' }}>
              When you use our Services, you will likely store important things in our application. These items may include
              your salary, monthy expenses and savings.You own the contents of your dashboard, We have designed our application
              in such a way that we can&apos;t access the contents of Your dashboard. This Agreement doesn&apos;t give us
              any rights to the contents of Your dashboard.<br/><br/>
            </p><br/>
            <Header as="h4" textAlign="left" style={{ marginTop: '-10px' }}>TERMINATION</Header>
            <p style={{ marginTop: '0px' }}>
              You are free to stop using the Services at any time. You also agree that we can suspend or end your access
              to the Services at any time. For example, we may suspend or end your access to the Services if we find you
              are not complying with the terms of this Agreement. In any case if we suspend or end your access, we
              will try to contact you by email to notify you of the details.<br/><br/>
              If you&apos;d like to have the contents of Your dashboard deleted from our servers,
              please contact us at budgettracker04@gmail.com
            </p>
          </Container>
        </div>
    );
  }
}

export default Terms;
