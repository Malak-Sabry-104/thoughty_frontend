    // Tab switching functionality
        const tabs = document.querySelectorAll('.flex.border-b button');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('tab-active'));
                tab.classList.add('tab-active');
                
                // Here you would typically load different content based on the tab
                // For this example, we'll just log to console
                console.log(`Switched to ${tab.textContent.trim()} tab`);
            });
        });
        
        // Quick action buttons
        const actionButtons = document.querySelectorAll('.action-btn');
        actionButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.textContent.trim();
                alert(`In a real app, this would open the ${action} functionality`);
            });
        });
        
        // Explore buttons on cards
        const exploreButtons = document.querySelectorAll('.card-gradient button');
        exploreButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const cardTitle = btn.closest('.card-gradient').querySelector('h3').textContent;
                alert(`Exploring pod: ${cardTitle}`);
            });
        });
        
        // Menu items
        const menuItems = document.querySelectorAll('.menu-item');
        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                menuItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
            });
        });