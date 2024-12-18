import mongoose from "mongoose";
import ork from './models/ork-model';
import waaagh from './models/waaagh-model';
import user from './models/user-model'

await mongoose.connect('mongodb+srv://oliverGranudden:2M8CNI1B5bRuEcEs@bunmymongo.dzh0b.mongodb.net/WAAAGH_Project?retryWrites=true&w=majority&appName=BunMyMongo')

const newOrk = new ork({ name: 'Ghazghkull Mag Uruk Thraka', role: 'Warboss', klan: 'Goffs' })
await user.create({ username: 'guy.moreguy', password: 'password', ork: newOrk._id })
const newWaaagh = new waaagh({name: 'Da Great WAAAGH!', warboss: newOrk._id, location: 'Ultima Segmentum', roster: [newOrk.id]})
newOrk.waaagh = newWaaagh._id
await newWaaagh.save()
await newOrk.save()
console.log("Done")