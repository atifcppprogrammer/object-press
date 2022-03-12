import React, { useCallback } from 'react';
import SettingsCard from 'components/SettingsCard/SettingsCard';
import { useDrawerDispatch } from 'context/DrawerContext';
import { withStyle } from 'baseui';
import { Grid, Row, Col as Column } from 'components/FlexBox/FlexBox';
import { useHistory } from 'react-router';

const Col = withStyle(Column, () => ({
  '@media only screen and (max-width: 767px)': {
    marginBottom: '20px',

    ':last-child': {
      marginBottom: 0,
    },
  },
}));

export default function Settings() {
  const history = useHistory();

  const dispatch = useDrawerDispatch();

  const openProfileForm = useCallback(() => {
    dispatch({ type: 'OPEN_DRAWER', drawerComponent: 'PROFILE_FORM' });
    history.push('/profile');
  }, [dispatch, history]);

  const opeCredsForm = useCallback(() => {
    dispatch({ type: 'OPEN_DRAWER', drawerComponent: 'CREDS_FORM' });
    history.push('/credentials');
  }, [dispatch, history]);

  return (
    <Grid fluid={true}>
      <Row>
        <Col md={6}>
          <SettingsCard
            icon={
              <i
                className="fas fa-user-cog fa-3x"
                style={{ color: 'rgba(59, 130, 246, 1)' }}
              ></i>
            }
            title="Update Profile"
            subtitle="Update your profile"
            onClick={openProfileForm}
          />
        </Col>

        <Col md={6}></Col>
      </Row>

      <Row>
        <Col md={6}>
          <SettingsCard
            icon={
              <i
                className="fas fa-user-lock fa-3x"
                style={{ color: 'rgba(59, 130, 246, 1)' }}
              />
            }
            title="View Credentials"
            subtitle="View your credentials"
            onClick={opeCredsForm}
          />
        </Col>

        <Col md={6}></Col>
      </Row>
    </Grid>
  );
}
