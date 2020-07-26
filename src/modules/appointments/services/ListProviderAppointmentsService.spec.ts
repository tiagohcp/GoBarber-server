import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';
import Appointment from '../infra/typeorm/entities/Appointment';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeCacheProvider: FakeCacheProvider;
let listProviderAppointments: ListProviderAppointmentsService;

describe('listProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProviderAppointments = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list appointments on a specific day from db', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 6, 29, 14, 0, 0),
    });

    const appointment2 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 6, 29, 15, 0, 0),
    });

    const appointments = await listProviderAppointments.execute({
      provider_id: 'provider',
      year: 2020,
      month: 7,
      day: 29,
    });

    expect(appointments).toEqual([appointment1, appointment2]);
  });

  it('should be able to list appointments on a specific day from cache', async () => {
    let appointmetsCached = Array(new Appointment());

    const appointment1 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 6, 29, 14, 0, 0),
    });

    const appointment2 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 6, 29, 15, 0, 0),
    });

    let appointments = await listProviderAppointments.execute({
      provider_id: 'provider',
      year: 2020,
      month: 7,
      day: 29,
    });

    appointments = await listProviderAppointments.execute({
      provider_id: 'provider',
      year: 2020,
      month: 7,
      day: 29,
    });

    appointmetsCached = appointments.map(appointment =>
      Object.assign(new Appointment(), {
        ...appointment,
        date: new Date(appointment.date),
      }),
    );

    expect(appointmetsCached).toEqual([appointment1, appointment2]);
  });
});
