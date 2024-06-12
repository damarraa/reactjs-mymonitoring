import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Layout from "./components/fragments/Layout"
import Dashboard from "./components/pages/Dashboard/Dashboard"
import LPemeriksaan from "./components/pages/LPemeriksaan/LPemeriksaan"
import LPerbaikanMTC from "./components/pages/LPerbaikanMTC/LPerbaikanMTC"
import LPermohonanPbb from "./components/pages/LPermohonanPbb/LPermohonanPbb"
import Login from "./components/pages/Login"
import JadwaldanLokasi from "./components/pages/JadwaldanLokasi/JadwaldanLokasi"
import Pengaturan from "./components/pages/Pengaturan/Pengaturan"
import TemuanPemeriksaan from "./components/pages/TemuanPemeriksaan/TemuanPemeriksaan"
import Register from "./components/pages/Register"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Dashboard/>}/>
          <Route path="JadwaldanLokasi" element={<JadwaldanLokasi/>}/>
          <Route path="LPemeriksaan" element={<LPemeriksaan/>} />
          <Route path="TemuanPemeriksaan" element={<TemuanPemeriksaan></TemuanPemeriksaan>} />
          <Route path="LPerbaikanMTC" element={<LPerbaikanMTC/>} />
          <Route path="LPermohonanPbb" element={<LPermohonanPbb/>} />
          <Route path="Pengaturan" element={<Pengaturan/>} />
        </Route>
        <Route path="Login" element={<Login></Login>}></Route>
        <Route path="Register" element={<Register></Register>}></Route>
      </Routes>
    </Router>
  )
}

export default App
