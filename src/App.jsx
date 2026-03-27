import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Module1 from './modules/Module1'
import Module2 from './modules/Module2'
import Module3 from './modules/Module3'
import Module4 from './modules/Module4'
import Module5 from './modules/Module5'
import Module6 from './modules/Module6'

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
      </Routes>
    </BrowserRouter>
  )
}
