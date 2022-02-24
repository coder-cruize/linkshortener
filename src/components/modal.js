export default function Modal({close, children}){
    const styles = {
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        position: 'fixed',
        zIindex: 9999,
        left: 0,
        top: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
    return(
        <div onClick={() => close()} style={styles}>
            <div onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}