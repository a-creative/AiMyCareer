import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { withTranslation } from 'react-i18next';
class Postings extends Component {
  
  render() {
    const { t } = this.props;  
    return <div>
      <Helmet>
        <title>{t('Postings')} - {t('Job Finder')}</title>
      </Helmet>
      <div>
        {t('Postings')}
      </div>
    </div>;
  }
}
export default withTranslation()(Postings);