import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ServersHeader from '../../components/Servers/ServersHeader';
import ServersLogo from '../../components/Servers/ServersLogo';
import ServersTable from '../../components/Servers/ServersTable';
import ServersTableHead from '../../components/Servers/ServersTableHead';
import ServersTableTittle from '../../components/Servers/ServersTableTittle';
import ServersTableItem from '../../components/Servers/ServersTableItem';
import ServersError from '../../components/Servers/ServersError';
import LogoutButton from '../../components/Servers/LogoutButton';
import LogoutIcon from '../../components/Icons/LogoutIcon';
import { fetchServers } from '../../store/thunk/servers';
import { signout } from '../../store/thunk/auth';
import { sortByName } from '../../utility/sortByName';
import { sortByDistance } from '../../utility/sortByDistance';
import Spinner from '../../components/Spinner/Spinner';

const Home = () => {
  const dispatch = useDispatch();
  const servers = useSelector(state => state.servers.servers);
  const error = useSelector(state => state.servers.error);
  const loading = useSelector(state => state.servers.loading);
  const [nameSortType, setNameSortType] = useState('');
  const [distanceSortType, setDistanceSortType] = useState('');

  useEffect(() => {
    dispatch(fetchServers());
  }, [dispatch]);

  const sortTypeHandler = currentType => (currentType !== 'asce' ? 'asce' : 'desc');

  const sortByNameHandler = () => {
    const sortType = sortTypeHandler(nameSortType);
    sortByName(servers, sortType);
    setNameSortType(sortType);
    setDistanceSortType('');
  };

  const sortByDistanceHandler = () => {
    const sortType = sortTypeHandler(distanceSortType);
    sortByDistance(servers, sortType);
    setDistanceSortType(sortType);
    setNameSortType('');
  };

  return (
    <>
      <ServersHeader>
        <ServersLogo />
        <LogoutButton onClick={() => dispatch(signout())}>
          <LogoutIcon />
          Logout
        </LogoutButton>
      </ServersHeader>
      <ServersTable>
        <ServersTableHead>
          <ServersTableTittle onClick={sortByNameHandler}>SERVER</ServersTableTittle>
          <ServersTableTittle onClick={sortByDistanceHandler}>DISTANCE</ServersTableTittle>
        </ServersTableHead>
        <Spinner show={loading} size="60px" MTop="50px" />
        {error ? (
          <ServersError>{error}</ServersError>
        ) : (
          servers.map(server => (
            <ServersTableItem key={`${server.name}${server.distance}`}>
              <span>{server.name}</span>
              <span>{`${server.distance} km`}</span>
            </ServersTableItem>
          ))
        )}
      </ServersTable>
    </>
  );
};

export default Home;
