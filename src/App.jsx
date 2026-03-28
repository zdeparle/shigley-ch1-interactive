import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Module1 from './modules/Module1'
import Module2 from './modules/Module2'
import Module3 from './modules/Module3'
import Module4 from './modules/Module4'
import Module5 from './modules/Module5'
import Module6 from './modules/Module6'
import Module7 from './modules/Module7'
import Module8 from './modules/Module8'
import Module9 from './modules/Module9'
import Module10 from './modules/Module10'
import Module11 from './modules/Module11'
import Module12 from './modules/Module12'
import Module13 from './modules/Module13'
import Module14 from './modules/Module14'
import Module15 from './modules/Module15'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/module/module1" element={<Module1 />} />
        <Route path="/module/module2" element={<Module2 />} />
        <Route path="/module/module3" element={<Module3 />} />
        <Route path="/module/module4" element={<Module4 />} />
        <Route path="/module/module5" element={<Module5 />} />
        <Route path="/module/module6" element={<Module6 />} />
        <Route path="/module/module7" element={<Module7 />} />
        <Route path="/module/module8" element={<Module8 />} />
        <Route path="/module/module9" element={<Module9 />} />
        <Route path="/module/module10" element={<Module10 />} />
        <Route path="/module/module11" element={<Module11 />} />
        <Route path="/module/module12" element={<Module12 />} />
        <Route path="/module/module13" element={<Module13 />} />
        <Route path="/module/module14" element={<Module14 />} />
        <Route path="/module/module15" element={<Module15 />} />
      </Routes>
    </BrowserRouter>
  )
}
