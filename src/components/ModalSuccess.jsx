import { MdOutlineWhatsapp } from 'react-icons/md'
import Modal from '/src/components/Modal'
import { Button } from './Base/Button';

export default function ModalSuccess({ npwp = '', showModal, handleChange }) {
  const cpAdmin = import.meta.env.VITE_NOMOR_HP_ADMIN;
  const wa = `https://wa.me/${cpAdmin}?text=Saya telah melakukan pendaftaran dengan nomor register ${npwp}`

  const onClose = () => {
    handleChange(false)
  }

  const footer = (
    <div className="flex gap-4">
      <Button
        onClick={onClose}
        variant="secondary"
        rounded
      >
        Close
      </Button>
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