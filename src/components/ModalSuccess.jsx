import { MdOutlineWhatsapp } from 'react-icons/md'
import Modal from '/src/components/Modal'

export default function ModalSuccess({ npwp = '', showModal, handleChange }) {
  const cpAdmin = import.meta.env.VITE_NOMOR_HP_ADMIN;
  const wa = `https://wa.me/${cpAdmin}?text=Saya telah melakukan pendaftaran dengan nomor register ${npwp}`

  const onClose = () => {
    handleChange(false)
  }

  const footer = (
    <div className="flex gap-4">
      <button
        onClick={onClose}
        className="py-1 px-3 text-slate rounded-lg active:bg-slate-500/50 shadow-md shadow-slate-500/30 focus:outline-none focus:ring-0 focus:border-blue-500 focus:shadow-lg focus:shadow-slate-500/30 hover:bg-slate-500/10 hover:text-slate-500 disabled:bg-blue-500/20 disabled:text-slate-400"
      >
        Close
      </button>
    </div>
  )

  const modal = (
    <Modal onClose={onClose} footer={footer}>
      <div className="flex flex-col items-start gap-4 text-wrap break-words">
        <h1 className="text-3xl font-semibold">
          Registrasi berhasil !
        </h1>
        <p>
          Silahkan menghubungi admin terkait pembayaran pada nomor whatsapp berikut
        </p>
        <p>
          <a href={encodeURI(wa)} target="_blank" className="ml-1 text-blue-600 hover:text-blue-500/30 flex justify-center items-center">
            <MdOutlineWhatsapp size={24} className="inline mr-2" />
            {cpAdmin}
          </a>
        </p>
      </div>
    </Modal>
  )

  return (
    <>
      {showModal && modal}
    </>
  )

}