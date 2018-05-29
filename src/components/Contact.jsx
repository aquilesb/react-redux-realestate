import React, { PureComponent } from 'react';
import InsideBanner from './InsideBanner';

class Contact extends PureComponent {
  render() {
    return (
      <main className="contact">
        <InsideBanner />
        <section className="container">
          <div className="spacer">
            <div className="row contact">
              <div className="col-lg-6 col-sm-6 ">
                <input type="text" className="form-control" placeholder="Full Name" />
                <input type="text" className="form-control" placeholder="Email Address" />
                <input type="text" className="form-control" placeholder="Contact Number" />
                <textarea rows="6" className="form-control" placeholder="Message" />
                <button type="submit" className="btn btn-success" name="Submit">Send Message</button>
              </div>
              <div className="col-lg-6 col-sm-6 ">
                <div className="well">
                  <iframe width="100%" height="300" title="location" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0" src="https://maps.google.com/maps?f=q&amp;source=s_q&amp;hl=en&amp;geocode=&amp;q=Pulchowk,+Patan,+Central+Region,+Nepal&amp;aq=0&amp;oq=pulch&amp;sll=37.0625,-95.677068&amp;sspn=39.371738,86.572266&amp;ie=UTF8&amp;hq=&amp;hnear=Pulchowk,+Patan+Dhoka,+Patan,+Bagmati,+Central+Region,+Nepal&amp;ll=27.678236,85.316853&amp;spn=0.001347,0.002642&amp;t=m&amp;z=14&amp;output=embed" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }
}
export default Contact;
