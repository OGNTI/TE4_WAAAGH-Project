import { Elysia, t } from 'elysia';
import cors from '@elysiajs/cors'
import mongoose from "mongoose";
import ork from './models/ork-model';
import waaagh from './models/waaagh-model';
import user from './models/user-model';

await mongoose.connect('mongodb+srv://oliverGranudden:2M8CNI1B5bRuEcEs@bunmymongo.dzh0b.mongodb.net/WAAAGH_Project?retryWrites=true&w=majority&appName=BunMyMongo')

new Elysia()
  .use(cors())
  .get('/waaaghs', async () => {
    try {
      return await waaagh.find({}).populate('warboss roster').exec();
    } catch (error) {
      return error
    }
  })
  .post('/waaaghs', async ({ body }) => {
    await waaagh.create({ name: body.name, warboss: body.warboss_id, location: body.location, roster: [body.warboss_id] })
  },
    {
      body: t.Object({
        name: t.String(),
        warboss_id: t.String(),
        location: t.String(),
      })
    })
  .get('/orks', async () => {
    try {
      return await ork.find({}).populate('waaagh').exec();
    } catch (error) {
      return error
    }
  })
  .get('/users/', async ({ query }) => {
    try {
      return JSON.parse(JSON.stringify(await user.findOne({ username: query.username }).populate('ork').exec()))
    } catch (error) {
      return error
    }
  })
  .post('/users', async ({ body }) => {
    const newOrk = new ork({ name: body.ork.name, role: body.ork.role, klan: body.ork.klan })
    await user.create({ username: body.username, password: body.password, ork: newOrk._id })
    await newOrk.save()
  },
    {
      body: t.Object({
        username: t.String(),
        password: t.String(),
        ork: t.Object({
          name: t.String(),
          role: t.String(),
          klan: t.String()
        })
      })
    })
  .listen(3030)